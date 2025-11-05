// lib/auth.ts
import { User } from '@/types';
import { storage } from './storage';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '+919876543210',
    role: 'customer'
  },
  {
    id: '2',
    name: 'Priya Patel',
    phone: '+919876543211',
    role: 'customer'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    username: 'amit.kumar',
    role: 'agent'
  },
  {
    id: '4',
    name: 'Sneha Singh',
    username: 'sneha.singh',
    role: 'agent'
  }
];

export const authService = {
  async login(credentials: { phone?: string; username?: string }): Promise<boolean> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let user: User | undefined;

    if (credentials.phone) {
      user = MOCK_USERS.find(u => u.phone === credentials.phone);
    } else if (credentials.username) {
      // Try to find by username first
      user = MOCK_USERS.find(u => u.username === credentials.username || u.name === credentials.username);
      // If not found, create a temporary customer user using the provided name so arbitrary names can start a chat
      if (!user) {
        user = {
          id: Date.now().toString(),
          name: credentials.username,
          role: 'customer'
        } as User;
      }
    }

    if (user) {
      storage.set('currentUser', user);
      return true;
    }

    return false;
  },

  logout(): void {
    storage.remove('currentUser');
  },

  getCurrentUser(): User | null {
    return storage.get<User>('currentUser');
  }
};