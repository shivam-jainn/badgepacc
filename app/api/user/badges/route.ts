import { prisma } from "@/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username'); 

  if (!username) {
    return new Response(JSON.stringify({ message: 'Username is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const userTokens = await prisma.user.findUnique({
      where: {
        username: username, 
      },
      select: {
        tokens: {
          include: {
            badge: true, 
          },
        },
      },
    });

    if (!userTokens) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const badgeUpdates = userTokens.tokens.map(async (token) => {
      await prisma.badge.update({
        where: { id: token.badge_id },
        data: {
          no_of_issued: {
            increment: 1, 
          },
        },
      });
      
      return {
        ...token,
        badge: {
          id: token.badge.id,
          name: token.badge.name,
          pic: token.badge.pic,
          description: token.badge.description,
        },
      };
    });

    await Promise.all(badgeUpdates);

    return new Response(JSON.stringify(userTokens.tokens), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user tokens:', error);
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
