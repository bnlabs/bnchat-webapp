import React from 'react';
import { Embed } from '../../types/Embed';

const EmbedContainer = ({ urlPreview }: { urlPreview: Embed}) => {
  if (!urlPreview) {
    return null;
  }

  return (
    <div className="url-preview-embed bg-slate-500 rounded-md">
      <div className="url-preview-details text-sm ">
        <h3 className="url-preview-title px-2 pt-2" >
          <a href={urlPreview.url} className="url-preview-url" target="_blank" rel="noopener noreferrer">
          {urlPreview.title}
          </a>
        </h3>
        <p className="url-preview-description px-2">{urlPreview.description}</p>
      </div>
      {urlPreview.imageUrl && (
        <div className="url-preview-image">
          <img src={urlPreview.imageUrl} className='h-32 p-5' alt="Preview"/>
        </div>
      )}
    </div>
  );
};

export default EmbedContainer;
