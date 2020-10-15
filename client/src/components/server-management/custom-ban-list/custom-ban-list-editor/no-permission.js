import React from 'react';

export default function() {
  return (
    <>
      <div className="text-center mt-2 mb-2">
        没有权限!
      </div>
      <div className="btn-wrapper text-center">
        <i className="fas fa-lock fa-4x"/>
      </div>
      <div className="text-center mt-2 mb-2">
        您无权查看此信息.
      </div>
    </>
  );
}