'use client';

import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@lib/routes';
import { ConfigProvider, Flex, ThemeConfig, Typography } from 'antd';
import classNames from 'classnames';
import styles from './WorkCard.module.scss';
import { TextTag, TextTagColor } from './components';
import { useMemo } from 'react';
import { StarIcon } from '@shared-packages/ui/icons';
import { themeVars } from '@shared-packages/ui';
import { BOOK_CARD_IMAGE_HEIGHT, BOOK_CARD_WIDTH } from '../constants';

interface IWorkCardProps {
  id: string;
  title: string;
  authorNames: string[];
  genre?: string;
  rating?: number;
  onlineVersionLink: string | null;
  available: boolean;
  className?: string;
}

type TWorkCardThemeConfig = ThemeConfig & {
  token: {
    bookCardWidth: number;
  };
};

const { Title, Text } = Typography;

export const WorkCard = ({
  id,
  title,
  authorNames,
  rating,
  onlineVersionLink,
  available,
  className,
}: IWorkCardProps) => {
  const themeConfig = useMemo(
    () =>
      ({
        token: {
          bookCardWidth: BOOK_CARD_WIDTH,
        },
        components: {
          Typography: {
            fontSizeHeading3: 12,
            lineHeightHeading3: 16 / 12,
            color: themeVars.color.text.primary,
            titleMarginBottom: 0,
            fontSize: 12,
          },
        },
      }) as TWorkCardThemeConfig,
    [],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <Flex vertical className={classNames(styles.bookCard, className)}>
        <Link href={APP_ROUTES.book(id)}>
          <div className={styles.imageContainer}>
            <Image
              src={`https://placehold.co/${BOOK_CARD_WIDTH}x${BOOK_CARD_IMAGE_HEIGHT}/png`}
              alt="Картинка с книгой"
              width={BOOK_CARD_WIDTH}
              height={BOOK_CARD_IMAGE_HEIGHT}
            />
            {available && (
              <TextTag className={styles.availableTag} text="В наличии" color={TextTagColor.Green} />
            )}
          </div>
          <Flex vertical className={styles.bookCardBody} gap={4}>
            <Title level={3} className={styles.title}>
              {title}
            </Title>
            <Flex gap={2} className={styles.authorsBlock} wrap="wrap">
              {authorNames.map((authorName) => (
                <Text key={authorName}>{authorName}</Text>
              ))}
            </Flex>
            <Flex gap={2} className={styles.tags}>
              {onlineVersionLink && <TextTag text="PDF" color={TextTagColor.Green} />}
              {rating && (
                <TextTag text={rating.toString()} color={TextTagColor.Yellow} icon={<StarIcon />} />
              )}
            </Flex>
          </Flex>
        </Link>
      </Flex>
    </ConfigProvider>
  );
};

