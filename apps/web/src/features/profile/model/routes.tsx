import { BookOutlined, ClockCircleOutlined, HeartOutlined, ProfileOutlined } from '@ant-design/icons';
import { APP_ROUTES } from '@global/routes';
import { ReactNode } from 'react';

export interface IProfileRoute {
  route: string;
  title: string | ReactNode;
  icon?: ReactNode;
}

export const ProfileRoutesMap: Record<string, IProfileRoute> = {
  [APP_ROUTES.profile.index]: {
    route: APP_ROUTES.profile.index,
    title: 'Профиль',
    icon: <ProfileOutlined />,
  },
  [APP_ROUTES.profile.favorite]: {
    route: APP_ROUTES.profile.favorite,
    title: 'Избранное',
    icon: <HeartOutlined />,
  },
  [APP_ROUTES.profile.works]: {
    route: APP_ROUTES.profile.works,
    title: 'Мои произведения',
    icon: <BookOutlined />,
  },
  [APP_ROUTES.profile.reservations]: {
    route: APP_ROUTES.profile.reservations,
    title: 'Брони',
    icon: <ClockCircleOutlined />,
  },
};

export const ProfileRoutes = Object.values(ProfileRoutesMap);
