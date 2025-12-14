// Mock data for demo purposes
export interface MockIOU {
  id: string;
  tokenId: number;
  creator: string;
  holder: string | null;
  description: string;
  hours: number;
  category: string;
  creatorSkill?: string; // What the creator offers in exchange
  deadline: string;
  collateral: string;
  status: 'pending' | 'accepted' | 'completed' | 'disputed' | 'false_claim' | 'redeemed';
  creatorConfirmed: boolean;
  holderConfirmed: boolean;
  redemptionRequested?: boolean; // Holder wants to redeem
  creatorDeliveredRedemption?: boolean; // Creator delivered redemption work
  holderConfirmedRedemption?: boolean; // Holder confirmed receiving redemption work
  createdAt: string;
  creatorReputation: number;
}

// Sample IOUs for demo (30 diverse IOUs)
export const mockIOUs: MockIOU[] = [
  // Design & Creative (10 IOUs)
  {
    id: '1',
    tokenId: 1,
    creator: '0x1234567890123456789012345678901234567890',
    holder: null,
    description: 'Design a professional logo and brand identity',
    hours: 3,
    category: 'Skilled',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 150,
  },
  {
    id: '2',
    tokenId: 2,
    creator: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    holder: null,
    description: 'Create social media graphics for Instagram campaign',
    hours: 2,
    category: 'Skilled',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.2',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 220,
  },
  {
    id: '3',
    tokenId: 3,
    creator: '0x2222222222222222222222222222222222222222',
    holder: null,
    description: 'Design UI/UX mockups for mobile app',
    hours: 5,
    category: 'Technical',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.5',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 340,
  },
  {
    id: '4',
    tokenId: 4,
    creator: '0x3333333333333333333333333333333333333333',
    holder: null,
    description: 'Illustrate children\'s book characters (5 illustrations)',
    hours: 8,
    category: 'Skilled',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.8',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 280,
  },
  {
    id: '5',
    tokenId: 5,
    creator: '0x4444444444444444444444444444444444444444',
    holder: null,
    description: 'Create animated explainer video (1 minute)',
    hours: 6,
    category: 'Technical',
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.6',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 310,
  },
  {
    id: '6',
    tokenId: 6,
    creator: '0x5555555555555555555555555555555555555555',
    holder: null,
    description: 'Design business card and letterhead templates',
    hours: 2,
    category: 'Basic',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.2',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 180,
  },
  {
    id: '7',
    tokenId: 7,
    creator: '0x6666666666666666666666666666666666666666',
    holder: null,
    description: 'Create infographic for research presentation',
    hours: 3,
    category: 'Skilled',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 240,
  },
  {
    id: '8',
    tokenId: 8,
    creator: '0x7777777777777777777777777777777777777777',
    holder: null,
    description: 'Design Twitch overlay and panels',
    hours: 4,
    category: 'Skilled',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.4',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 260,
  },
  {
    id: '9',
    tokenId: 9,
    creator: '0x8888888888888888888888888888888888888888',
    holder: null,
    description: 'Create product packaging design mockup',
    hours: 5,
    category: 'Technical',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.5',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 320,
  },
  {
    id: '10',
    tokenId: 10,
    creator: '0x9999999999999999999999999999999999999999',
    holder: null,
    description: 'Design email newsletter template (HTML)',
    hours: 3,
    category: 'Skilled',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 200,
  },

  // Development & Technical (10 IOUs)
  {
    id: '11',
    tokenId: 11,
    creator: '0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    holder: null,
    description: 'Debug and fix React application errors',
    hours: 2,
    category: 'Technical',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.2',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 290,
  },
  {
    id: '12',
    tokenId: 12,
    creator: '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    holder: null,
    description: 'Build responsive landing page with Tailwind CSS',
    hours: 4,
    category: 'Technical',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.4',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 350,
  },
  {
    id: '13',
    tokenId: 13,
    creator: '0xcccccccccccccccccccccccccccccccccccccccc',
    holder: null,
    description: 'Create REST API with Node.js and Express',
    hours: 6,
    category: 'Expert',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.6',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 420,
  },
  {
    id: '14',
    tokenId: 14,
    creator: '0xdddddddddddddddddddddddddddddddddddddddd',
    holder: null,
    description: 'Set up CI/CD pipeline with GitHub Actions',
    hours: 3,
    category: 'Technical',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 380,
  },
  {
    id: '15',
    tokenId: 15,
    creator: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    holder: null,
    description: 'Optimize database queries for better performance',
    hours: 4,
    category: 'Expert',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.4',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 450,
  },
  {
    id: '16',
    tokenId: 16,
    creator: '0xffffffffffffffffffffffffffffffffffffffff',
    holder: null,
    description: 'Implement user authentication with JWT',
    hours: 5,
    category: 'Technical',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.5',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 360,
  },
  {
    id: '17',
    tokenId: 17,
    creator: '0xa1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1',
    holder: null,
    description: 'Build Chrome extension for productivity tracking',
    hours: 8,
    category: 'Expert',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.8',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 480,
  },
  {
    id: '18',
    tokenId: 18,
    creator: '0xb2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2',
    holder: null,
    description: 'Create Python script for data scraping',
    hours: 3,
    category: 'Technical',
    deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 330,
  },
  {
    id: '19',
    tokenId: 19,
    creator: '0xc3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3c3',
    holder: null,
    description: 'Fix mobile responsiveness issues on website',
    hours: 2,
    category: 'Skilled',
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.2',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 270,
  },
  {
    id: '20',
    tokenId: 20,
    creator: '0xd4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4',
    holder: null,
    description: 'Integrate payment gateway (Stripe/PayPal)',
    hours: 4,
    category: 'Technical',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.4',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 390,
  },

  // Writing & Content (10 IOUs)
  {
    id: '21',
    tokenId: 21,
    creator: '0xe5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5',
    holder: null,
    description: 'Write technical documentation for API (10 pages)',
    hours: 5,
    category: 'Skilled',
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.5',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 340,
  },
  {
    id: '22',
    tokenId: 22,
    creator: '0xf6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6f6',
    holder: null,
    description: 'Create SEO-optimized blog posts (3 articles, 1000 words each)',
    hours: 6,
    category: 'Skilled',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.6',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 310,
  },
  {
    id: '23',
    tokenId: 23,
    creator: '0xa7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a7a7',
    holder: null,
    description: 'Proofread and edit research paper (20 pages)',
    hours: 3,
    category: 'Skilled',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 280,
  },
  {
    id: '24',
    tokenId: 24,
    creator: '0xb8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8',
    holder: null,
    description: 'Write product descriptions for e-commerce (50 items)',
    hours: 4,
    category: 'Basic',
    deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.4',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 220,
  },
  {
    id: '25',
    tokenId: 25,
    creator: '0xc9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9c9',
    holder: null,
    description: 'Create social media content calendar (1 month)',
    hours: 3,
    category: 'Skilled',
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 250,
  },
  {
    id: '26',
    tokenId: 26,
    creator: '0xdadadadadadadadadadadadadadadadadadadada',
    holder: null,
    description: 'Write compelling email marketing campaign (5 emails)',
    hours: 4,
    category: 'Skilled',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.4',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 290,
  },
  {
    id: '27',
    tokenId: 27,
    creator: '0xebebebebebebebebebebebebebebebebebebebeb',
    holder: null,
    description: 'Translate document from English to Spanish (5000 words)',
    hours: 5,
    category: 'Skilled',
    deadline: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.5',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 320,
  },
  {
    id: '28',
    tokenId: 28,
    creator: '0xfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfcfc',
    holder: null,
    description: 'Create press release for product launch',
    hours: 2,
    category: 'Skilled',
    deadline: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.2',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 260,
  },
  {
    id: '29',
    tokenId: 29,
    creator: '0xadadadadadadadadadadadadadadadadadadadad',
    holder: null,
    description: 'Write video script for YouTube tutorial (10 minutes)',
    hours: 3,
    category: 'Skilled',
    deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.3',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 240,
  },
  {
    id: '30',
    tokenId: 30,
    creator: '0xbebebebebebebebebebebebebebebebebebebebebe',
    holder: null,
    description: 'Create comprehensive business plan (15 pages)',
    hours: 8,
    category: 'Expert',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    collateral: '0.8',
    status: 'pending',
    creatorConfirmed: false,
    holderConfirmed: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    creatorReputation: 410,
  },
];

// Local storage key
const STORAGE_KEY = 'timebank_mock_ious';

// Get all IOUs
export const getMockIOUs = (): MockIOU[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      // Return existing data (preserves user-created IOUs)
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stored IOUs:', error);
    }
  }
  // Only initialize with 30 IOUs if localStorage is empty
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockIOUs));
  return mockIOUs;
};

// Add new IOU
export const addMockIOU = (iou: Omit<MockIOU, 'id' | 'tokenId' | 'createdAt'>): MockIOU => {
  const ious = getMockIOUs();
  const newIOU: MockIOU = {
    ...iou,
    id: Date.now().toString(),
    tokenId: ious.length + 1,
    createdAt: new Date().toISOString(),
  };
  ious.push(newIOU);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ious));
  return newIOU;
};

// Update IOU
export const updateMockIOU = (id: string, updates: Partial<MockIOU>): MockIOU | null => {
  const ious = getMockIOUs();
  const index = ious.findIndex(iou => iou.id === id);
  if (index === -1) return null;
  
  ious[index] = { ...ious[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ious));
  return ious[index];
};

// Accept IOU
export const acceptMockIOU = (id: string, holder: string): MockIOU | null => {
  return updateMockIOU(id, { holder, status: 'accepted' });
};

// Confirm completion
export const confirmMockCompletion = (id: string, isCreator: boolean): MockIOU | null => {
  const ious = getMockIOUs();
  const iou = ious.find(i => i.id === id);
  if (!iou) return null;

  const updates: Partial<MockIOU> = isCreator 
    ? { creatorConfirmed: true }
    : { holderConfirmed: true };

  // If both confirmed, mark as completed
  if ((isCreator && iou.holderConfirmed) || (!isCreator && iou.creatorConfirmed)) {
    updates.status = 'completed';
  }

  return updateMockIOU(id, updates);
};

// File dispute
export const fileMockDispute = (id: string): MockIOU | null => {
  return updateMockIOU(id, { status: 'disputed' });
};

// Get user's IOUs
export const getUserMockIOUs = (address: string): { created: MockIOU[], held: MockIOU[] } => {
  const ious = getMockIOUs();
  return {
    created: ious.filter(iou => iou.creator.toLowerCase() === address.toLowerCase()),
    held: ious.filter(iou => iou.holder?.toLowerCase() === address.toLowerCase()),
  };
};

// Mock reputation data
export const getMockReputation = (address: string) => {
  const { created, held } = getUserMockIOUs(address);
  const completed = [...created, ...held].filter(iou => iou.status === 'completed').length;
  const defaulted = 0; // For demo, no defaults
  
  return {
    score: 100 + (completed * 20),
    completed,
    defaulted,
    totalPoints: completed * 20,
    tier: completed >= 25 ? 'Expert' : completed >= 10 ? 'Verified' : completed >= 5 ? 'Trusted' : 'Beginner',
  };
};

// Request redemption (holder wants to use the IOU)
export const requestMockRedemption = (id: string): MockIOU | null => {
  return updateMockIOU(id, { redemptionRequested: true });
};

// Creator confirms delivering redemption work
export const creatorConfirmRedemption = (id: string): MockIOU | null => {
  const ious = getMockIOUs();
  const iou = ious.find(i => i.id === id);
  if (!iou) return null;

  const updates: Partial<MockIOU> = { creatorDeliveredRedemption: true };
  
  // If holder already confirmed, mark as redeemed
  if (iou.holderConfirmedRedemption) {
    updates.status = 'redeemed';
  }
  
  return updateMockIOU(id, updates);
};

// Holder confirms receiving redemption work
export const holderConfirmRedemption = (id: string): MockIOU | null => {
  const ious = getMockIOUs();
  const iou = ious.find(i => i.id === id);
  if (!iou) return null;

  const updates: Partial<MockIOU> = { holderConfirmedRedemption: true };
  
  // If creator already delivered, mark as redeemed
  if (iou.creatorDeliveredRedemption) {
    updates.status = 'redeemed';
  }
  
  return updateMockIOU(id, updates);
};

