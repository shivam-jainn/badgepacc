import { prisma } from '@/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, badgeId } = data;

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const emailPrefix = email.split('@')[0];
    const currentDate = new Date().toISOString().split('T')[0];
    const issuanceId = `${emailPrefix}-${badgeId.substring(0, 4)}-${currentDate}`;

    const result = await prisma.$transaction([
      prisma.tokens.create({
        data: {
          issuance_time: new Date(),
          issuance_id: issuanceId,
          user: { connect: { email } },
          badge: { connect: { id: badgeId } },
        },
      }),
      prisma.badge.update({
        where: { id: badgeId },
        data: {
          no_of_issued: { increment: 1 },
        },
      }),
    ]);

    return new Response(
      JSON.stringify({ message: 'Token claimed successfully', token: result[0] }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error(error);
    if (error.code === 'P2002') {
      return new Response(JSON.stringify({ message: 'You have already claimed this badge' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Failed to claim token' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
