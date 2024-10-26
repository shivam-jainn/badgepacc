import { prisma } from '@/prisma';
import { User } from '@prisma/client';

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const { email, id, accounts, sessions, ...updateData } = data; // Exclude id, accounts, sessions

    if (!email) {
      return new Response(JSON.stringify({ message: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if ('id' in updateData || 'accounts' in updateData || 'sessions' in updateData) {
      return new Response(
        JSON.stringify({ message: 'ID, accounts, or sessions cannot be updated' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: updateData,
    });

    return new Response(
      JSON.stringify({ message: 'User updated successfully', user: updatedUser }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ message: 'Failed to update user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


type UserDataPoints = (keyof User | 'badges' | 'tokens' | 'skills' | 'banner' | 'socials')[]; 

export async function POST(request: Request) {
  try {
    const { username, datapoints }: { username: string; datapoints: UserDataPoints } = await request.json();

    const allowedFields: UserDataPoints = ['name', 'username', 'email', 'isOrganisation', 'bio', 'website', 'badges', 'tokens','image','skills','banner','socials'];
    const selectedFields = (datapoints || []).filter((field) => allowedFields.includes(field));

    const selectOptions: Record<string, boolean> = {};
    selectedFields.forEach((field) => {
      selectOptions[field] = true;
    });

    const userDetails = await prisma.user.findUnique({
      where: { username },
      select: selectOptions,
    });

    if (!userDetails) {
      return new Response('User not found', { status: 404 });
    }

    return new Response(JSON.stringify(userDetails), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Error fetching user data', { status: 500 });
  }
}
