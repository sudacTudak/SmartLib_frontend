import classNames from 'classnames';
import styles from './CoverTagsRow.module.scss';
import { TextTag, TextTagColor } from 'src/shared/ui/components';
import { StarFilled } from '@ant-design/icons';

export interface ICoverTagsRowProps {
  rating?: number;
  isAvailable: boolean;
  hasOnlineVersion: boolean;
  className?: string;
}

export const CoverTagsRow = ({ rating, isAvailable, hasOnlineVersion, className }: ICoverTagsRowProps) => {
  const ratingValue = rating !== undefined && rating > 0 ? rating : undefined;

  return (
    <div className={classNames(styles.tagsRow, className)}>
      {ratingValue && (
        <TextTag
          text={ratingValue.toString()}
          color={TextTagColor.Yellow}
          icon={<StarFilled style={{ fontSize: 12 }} />}
        />
      )}
      {hasOnlineVersion && <TextTag text="PDF" color={TextTagColor.Blue} />}
      {isAvailable && <TextTag text="В наличии" color={TextTagColor.Green} />}
    </div>
  );
};
