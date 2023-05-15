import React from "react";

const AuthLayout = ({ children, header, footer }) => {
  return (
    <section className="bg-gray-200 w-full h-screen">
      <main className="container mx-auto max-w-3xl">
        <section className="pb-5 px-6 pt-14">
          <div>
            <header className="px-7">{header}</header>
            <section className="py-5 ">{children}</section>
            <footer>{footer}</footer>
          </div>
        </section>
      </main>
    </section>
  );
};

export default AuthLayout;
