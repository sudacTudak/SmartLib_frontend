import { Flex } from 'antd';

import styles from './TextTag.module.scss';
import cn from 'classnames';
import { TextTagColor } from './enums';
import { JSX } from 'react';

interface ITextTagProps {
  color: TextTagColor;
  text: string;
  icon?: JSX.Element;
  className?: string;
}

export const TextTag = ({ color, text, icon, className }: ITextTagProps) => {
  return (
    <Flex gap={2} align="center" className={cn(styles.textTag, styles[color], className)}>
      {text}
      {icon}
    </Flex>
  );
};

