'use client';

import { TextAreaProps } from 'antd/es/input';
import { Input } from 'antd';
import classNames from 'classnames';

import styles from './CustomTextArea.module.scss';

type TTextAreaProps = TextAreaProps;

export function CustomTextArea({ className, ...props }: TTextAreaProps) {
  return <Input.TextArea className={classNames(styles.textarea, className)} {...props} />;
}
