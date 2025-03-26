import { FC } from 'react';
import { Loader, Skeleton } from './loader';

/**
 * This file provides examples of how to use the enhanced Loader component
 * with both spinner and skeleton loading patterns.
 */
export const LoaderExamples: FC = () => {
  return (
    <div className="space-y-8 p-4">
      {/* Spinner Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Spinner Loaders</h2>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm mb-2">Small</p>
            <Loader size="sm" />
          </div>
          <div>
            <p className="text-sm mb-2">Default</p>
            <Loader />
          </div>
          <div>
            <p className="text-sm mb-2">Large</p>
            <Loader size="lg" />
          </div>
          <div>
            <p className="text-sm mb-2">Secondary</p>
            <Loader variant="secondary" />
          </div>
        </div>
      </section>

      {/* Skeleton Examples */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Skeleton Loaders</h2>
        <div className="space-y-4">
          {/* Basic Skeleton */}
          <div>
            <p className="text-sm mb-2">Basic Skeleton</p>
            <Loader type="skeleton" width="200px" height="24px" />
          </div>

          {/* Card Skeleton */}
          <div>
            <p className="text-sm mb-2">Card Skeleton</p>
            <div className="border rounded-lg p-4 max-w-sm">
              <Loader type="skeleton" width="70%" height="24px" className="mb-2" />
              <Loader type="skeleton" width="100%" height="100px" className="mb-2" />
              <Loader type="skeleton" width="40%" height="16px" />
            </div>
          </div>

          {/* Avatar with Text Skeleton */}
          <div>
            <p className="text-sm mb-2">User Card Skeleton</p>
            <div className="flex items-center gap-3">
              <Loader type="skeleton" width="48px" height="48px" borderRadius="9999px" />
              <div className="space-y-2">
                <Loader type="skeleton" width="120px" height="16px" />
                <Loader type="skeleton" width="80px" height="12px" />
              </div>
            </div>
          </div>

          {/* Custom Skeleton with Children */}
          <div>
            <p className="text-sm mb-2">Custom Layout Skeleton</p>
            <Loader type="skeleton" className="p-4 rounded-lg">
              <div className="space-y-4">
                <Skeleton width="80%" height="24px" />
                <div className="flex gap-2">
                  <Skeleton width="48px" height="48px" borderRadius="8px" />
                  <Skeleton width="48px" height="48px" borderRadius="8px" />
                  <Skeleton width="48px" height="48px" borderRadius="8px" />
                </div>
                <Skeleton width="100%" height="100px" />
              </div>
            </Loader>
          </div>
        </div>
      </section>
    </div>
  );
};
