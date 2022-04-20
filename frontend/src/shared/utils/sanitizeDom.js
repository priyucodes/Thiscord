import DOMPurify from 'dompurify';

export const sanitizeDom = dirtyData => {
  const sanitizedData = DOMPurify.sanitize(dirtyData);
  return sanitizedData;
  // return <div dangerouslySetInnerHTML={{ __html: sanitizedData }}></div>;
};
