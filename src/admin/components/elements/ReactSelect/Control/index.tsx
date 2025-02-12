import React from 'react';
import { components as SelectComponents, ControlProps } from 'react-select';
import type { Option } from '../types';

export const Control: React.FC<ControlProps<Option, any>> = (props) => {
  const {
    children,
    innerProps,
    selectProps: {
      customProps: {
        disableMouseDown,
        disableKeyDown,
      } = {},
    } = {},
  } = props;

  return (
    <SelectComponents.Control
      {...props}
      innerProps={{
        ...innerProps,
        onMouseDown: (e) => {
          // we need to prevent react-select from hijacking the 'onMouseDown' event while modals are open (i.e. the 'Relationship' field component)
          if (!disableMouseDown) {
            innerProps.onMouseDown(e);
          }
        },
        // react-select has this typed incorrectly so we disable the linting rule
        // we need to prevent react-select from hijacking the 'onKeyDown' event while modals are open (i.e. the 'Relationship' field component)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onKeyDown: (e) => {
          if (disableKeyDown) {
            e.stopPropagation();
            // Create event for keydown listeners which specifically want to bypass this stopPropagation
            const bypassEvent = new CustomEvent('bypassKeyDown', { detail: e });
            document.dispatchEvent(bypassEvent);
          }
        },
      }}
    >
      {children}
    </SelectComponents.Control>
  );
};
