import React from 'react';
import { elementType } from 'prop-types';

import IconAngleLeftSVG from '../../assets/svg/IconAngleLeft.svg';
import IconAngleRightSVG from '../../assets/svg/IconAngleRight.svg';
import IconAnnotationInfoFilledSVG from '../../assets/svg/IconAnnotationInfoFilled.svg';
import IconArrowLeftSVG from '../../assets/svg/IconArrowLeft.svg';
import IconArrowRightSVG from '../../assets/svg/IconArrowRight.svg';
import IconArrowsFromCenterSVG from '../../assets/svg/IconArrowsFromCenter.svg';
import IconArrowUpRightSVG from '../../assets/svg/IconArrowUpRight.svg';
import IconCheckSVG from '../../assets/svg/IconCheck.svg';
import IconChevronLeftSVG from '../../assets/svg/IconChevronLeft.svg';
import IconChevronRightSVG from '../../assets/svg/IconChevronRight.svg';
import IconCopySVG from '../../assets/svg/IconCopy.svg';
import IconEllipsisVerticalSVG from '../../assets/svg/IconEllipsisVertical.svg';
import IconExclamationCircleFilledSVG from '../../assets/svg/IconExclamationCircleFilled.svg';
import IconEyeFilledSVG from '../../assets/svg/IconEyeFilled.svg';
import IconInfoSquareFilledSVG from '../../assets/svg/IconInfoSquareFilled.svg';
import IconLinkDiagonalSVG from '../../assets/svg/IconLinkDiagonal.svg';
import IconMessagePlusFilledSVG from '../../assets/svg/IconMessagePlusFilled.svg';
import IconNotificationTextSVG from '../../assets/svg/IconNotificationText.svg';
import IconNotificationTextFilledSVG from '../../assets/svg/IconNotificationTextFilled.svg';
import IconPencilLineFilledSVG from '../../assets/svg/IconPencilLineFilled.svg';
import IconPlusSquareFilledSVG from '../../assets/svg/IconPlusSquareFilled.svg';
import IconTrashExclamationFilledSVG from '../../assets/svg/IconTrashExclamationFilled.svg';
import IconXmarkSVG from '../../assets/svg/IconXmark.svg';
import LogoJotformColorSVG from '../../assets/svg/LogoJotformColor.svg';

const Icon = ({ Component, ...props }) => <Component {...props} />;

Icon.propTypes = {
  Component: elementType.isRequired
};

export const IconArrowLeft = (props) => <Icon Component={IconArrowLeftSVG} {...props} />;
export const IconArrowRight = (props) => <Icon Component={IconArrowRightSVG} {...props} />;
export const IconArrowUpRight = (props) => <Icon Component={IconArrowUpRightSVG} {...props} />;
export const IconCheck = (props) => <Icon Component={IconCheckSVG} {...props} />;
export const IconCopy = (props) => <Icon Component={IconCopySVG} {...props} />;
export const IconEyeFilled = (props) => <Icon Component={IconEyeFilledSVG} {...props} />;
export const IconInfoSquareFilled = (props) => <Icon Component={IconInfoSquareFilledSVG} {...props} />;
export const IconNotificationText = (props) => <Icon Component={IconNotificationTextSVG} {...props} />;
export const IconTrashExclamationFilled = (props) => <Icon Component={IconTrashExclamationFilledSVG} {...props} />;
export const LogoJotformColor = (props) => <Icon Component={LogoJotformColorSVG} {...props} />;
export const IconXmark = (props) => <Icon Component={IconXmarkSVG} {...props} />;
export const IconMessagePlusFilled = (props) => <Icon Component={IconMessagePlusFilledSVG} {...props} />;
export const IconPencilLineFilled = (props) => <Icon Component={IconPencilLineFilledSVG} {...props} />;
export const IconPlusSquareFilled = (props) => <Icon Component={IconPlusSquareFilledSVG} {...props} />;
export const IconAngleLeft = (props) => <Icon Component={IconAngleLeftSVG} {...props} />;
export const IconAngleRight = (props) => <Icon Component={IconAngleRightSVG} {...props} />;
export const IconChevronLeft = (props) => <Icon Component={IconChevronLeftSVG} {...props} />;
export const IconChevronRight = (props) => <Icon Component={IconChevronRightSVG} {...props} />;
export const IconArrowsFromCenter = (props) => <Icon Component={IconArrowsFromCenterSVG} {...props} />;
export const IconAnnotationInfoFilled = (props) => <Icon Component={IconAnnotationInfoFilledSVG} {...props} />;
export const IconEllipsisVertical = (props) => <Icon Component={IconEllipsisVerticalSVG} {...props} />;
export const IconNotificationTextFilled = (props) => <Icon Component={IconNotificationTextFilledSVG} {...props} />;
export const IconExclamationCircleFilled = (props) => <Icon Component={IconExclamationCircleFilledSVG} {...props} />;
export const IconLinkDiagonal = (props) => <Icon Component={IconLinkDiagonalSVG} {...props} />;
