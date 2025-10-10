export type SocialPlatform = 'github' | 'linkedin' | 'twitter';

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface TeamMember {
  name: string;
  description: string;
  role: string;
  imageUrl: string;
  socialLinks: SocialLink[];
}