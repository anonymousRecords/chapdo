'use client';

import { Notion } from '@notionpresso/react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';

export const NotionRenderer = ({
  blocks,
  title,
  cover,
}: {
  blocks: any[];
  title?: string;
  cover?: string;
}) => {
  if (!blocks || blocks.length === 0) {
    return <div>No content available</div>;
  }

  const ErrorComponent = () => (
    <div>에러러</div>
  );

  return (
    <ErrorBoundary errorComponent={ErrorComponent}>
      <Notion>
        {cover && <Notion.Cover src={cover} />}
        <Notion.Body>
          {title && <Notion.Title title={title} />}
          <Notion.Blocks blocks={blocks} />
        </Notion.Body>
      </Notion>
    </ErrorBoundary>
  );
};
