// @ts-nocheck
// ExtractedAssetData.tsx
import React from 'react'


interface ExtractedAssetDataProps {
    assetValues: string[]; // Update the type based on your data structure
  }
  
  const ExtractedAssetData: React.FC<ExtractedAssetDataProps> = ({ assetValues }) => {
    // Your component logic here, and you can use assetValues
    // ...
  
    return (
      <div>
        <p>Extracted Asset Data:</p>
        {/* Render using assetValues */}
        {assetValues.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </div>
    );
  };
  
  export default ExtractedAssetData;
  