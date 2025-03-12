'use client';

import { createContext, useState } from 'react';

const RouteContext = createContext<any>(null);

function RouteContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);

  return (
    <RouteContext.Provider value={{ hoveredRoute, setHoveredRoute, selectedRoute, setSelectedRoute }}>
      {children}
    </RouteContext.Provider>
  );
}

export {
  RouteContext,
  RouteContextProvider,
};
