import React from 'react';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Outlet } from '@tanstack/react-router';


export const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Bem-vindo à Home</h1>
      <p>Este é o conteúdo da página inicial.</p>
    </div>
  );
};