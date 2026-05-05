'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ConfigProvider, Flex, ThemeConfig, Typography } from 'antd';
import classNames from 'classnames';
import styles from './WorkCard.module.scss';
import { useMemo } from 'react';
import { themeVars } from '@shared-packages/ui';
import { workCoverPlaceholder300x430Url } from '@shared-packages/ui';
import { BOOK_CARD_IMAGE_HEIGHT, BOOK_CARD_WIDTH } from '../WorkList/constants';
import { APP_ROUTES } from '@global/routes';
import { CoverTagsRow } from './components';
import { TextTag, TextTagColor } from '@shared/ui/components';

interface IWorkCardProps {
  id: string;
  title: string;
  authorNames: string[];
  genreTitles: string[];
  rating?: number;
  onlineVersionLink: string | null;
  previewLink?: string | null;
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
  genreTitles,
  rating,
  onlineVersionLink,
  previewLink,
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
        <Link href={APP_ROUTES.work(id)}>
          <div className={styles.imageContainer}>
            <Image
              src={previewLink || workCoverPlaceholder300x430Url}
              alt={title}
              width={BOOK_CARD_WIDTH}
              height={BOOK_CARD_IMAGE_HEIGHT}
            />
            <CoverTagsRow
              className={styles.coverTagsRow}
              rating={rating}
              isAvailable={available}
              hasOnlineVersion={Boolean(onlineVersionLink)}
            />
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
            {genreTitles.length > 0 && (
              <Flex gap={2} className={styles.tags} wrap="wrap">
                {genreTitles.slice(0, 2).map((t) => (
                  <TextTag key={t} text={t} color={TextTagColor.Yellow} />
                ))}
              </Flex>
            )}
          </Flex>
        </Link>
      </Flex>
    </ConfigProvider>
  );
};
