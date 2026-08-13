import React from 'react';
import { MessageSquare, UserPlus, Receipt, Headset, Calendar, Megaphone, Package, FileCheck, AlertCircle, UtensilsCrossed } from 'lucide-react';
import { TrackIconName } from '../types';

const ICONS: Record<TrackIconName, React.ComponentType<{ className?: string }>> = {
  MessageSquare,
  UserPlus,
  Receipt,
  Headset,
  Calendar,
  Megaphone,
  Package,
  FileCheck,
  AlertCircle,
  UtensilsCrossed,
};

export const TrackIcon: React.FC<{ name: TrackIconName; className?: string }> = ({ name, className }) => {
  const Icon = ICONS[name] ?? MessageSquare;
  return <Icon className={className} />;
};
