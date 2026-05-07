import { Flex } from 'antd';

import styles from './TextTag.module.scss';
import cn from 'classnames';
import { TextTagColor, TextTagSize } from './enums';
import { JSX } from 'react';

interface ITextTagProps {
  color: TextTagColor;
  text: string;
  icon?: JSX.Element;
  size?: TextTagSize;
  className?: string;
}

export const TextTag = ({ color, size = TextTagSize.Small, text, icon, className }: ITextTagProps) => {
  return (
    <Flex gap={2} align="center" className={cn(styles.textTag, styles[color], styles[size], className)}>
      {text}
      {icon}
    </Flex>
  );
};

