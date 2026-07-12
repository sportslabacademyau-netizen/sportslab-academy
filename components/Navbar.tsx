'use client'

import { useState } from 'react'

interface NavbarProps {
  loggedIn: boolean
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  itemCount: number
  onCartClick: () => void
  onAuthClick: () => void
}

export default function Navbar({
  loggedIn,
  menuOpen,
  setMenuOpen,
  itemCount,
  onCartClick,
  onAuthClick,
}: NavbarProps) {
  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#2563EB] text-white">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-2">
          {/* MOBILE CART LEFT (cart always visible; login hidden for now) */}
          <div className="z-10 flex items-center md:hidden">
            <button
              type="button"
              onClick={onCartClick}
              className="relative ml-2 cursor-pointer"
            >
              <span className="text-3xl brightness-0 invert">🛒</span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* LOGO */}
          <a
            href="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <img
              src="/logo1.png"
              alt="SportsLab Academy"
              className="h-24 w-auto object-contain md:h-28"
            />
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="/camp" className="font-semibold hover:text-white/70">
              HOLIDAY PROGRAMS
            </a>
            <a href="/coaching" className="font-semibold hover:text-white/70">
              PRIVATE COACHING
            </a>
            <a href="/junior-program" className="font-semibold hover:text-white/70">
              JUNIOR PROGRAMS
            </a>
            <a href="/italy-tour" className="font-semibold hover:text-white/70">
              ITALY TOUR
            </a>
            <a href="/team" className="font-semibold hover:text-white/70">
              MEET OUR TEAM
            </a>
            {loggedIn && (
              <a
                href="/dashboard"
                className="font-black uppercase tracking-wide hover:text-white/70"
              >
                DASHBOARD
              </a>
            )}
            <button
              type="button"
              onClick={onCartClick}
              className="relative cursor-pointer"
            >
              <span className="text-3xl brightness-0 invert">🛒</span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                  {itemCount}
                </span>
              )}
            </button>
            {/* LOGIN/LOGOUT hidden for now — re-enable to bring auth back.
            <button
              type="button"
              onClick={onAuthClick}
              className="cursor-pointer rounded-full bg-white px-5 py-2 text-sm font-black text-[#2563EB]"
            >
              {loggedIn ? 'LOGOUT' : 'LOGIN'}
            </button>
            */}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="z-10 flex h-10 w-10 items-center justify-center text-3xl font-black md:hidden"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99999] bg-[#2563EB] text-white md:hidden">
          {/* TOP BAR */}
          <div className="relative flex items-center justify-between px-4 py-3">
            <div className="z-10 flex items-center md:hidden">
              <button
                type="button"
                onClick={onCartClick}
                className="relative ml-2"
              >
                <span className="text-3xl brightness-0 invert">🛒</span>
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* LOGO */}
            <a
              href="/"
              onClick={() => setMenuOpen(false)}
              className="absolute left-1/2 -translate-x-1/2"
            >
              <img
                src="/logo1.png"
                alt="SportsLab Academy"
                className="h-24 w-auto object-contain"
              />
            </a>

            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="z-10 flex h-10 w-10 items-center justify-center text-4xl font-light leading-none"
            >
              ×
            </button>
          </div>

          {/* MENU LINKS */}
          <div className="mt-6 flex flex-col px-8 text-2xl font-light uppercase tracking-tight">
            <a
              onClick={() => setMenuOpen(false)}
              href="/"
              className="whitespace-nowrap border-b border-white/20 py-4"
            >
              HOME
            </a>
            {loggedIn && (
              <a
                onClick={() => setMenuOpen(false)}
                href="/dashboard"
                className="whitespace-nowrap border-b border-white/20 py-4"
              >
                DASHBOARD
              </a>
            )}
            <a
              onClick={() => setMenuOpen(false)}
              href="/camp"
              className="whitespace-nowrap border-b border-white/20 py-4"
            >
              HOLIDAY PROGRAMS
            </a>
            <a
              onClick={() => setMenuOpen(false)}
              href="/coaching"
              className="whitespace-nowrap border-b border-white/20 py-4"
            >
              PRIVATE COACHING
            </a>
            <a
              onClick={() => setMenuOpen(false)}
              href="/junior-program"
              className="whitespace-nowrap border-b border-white/20 py-4"
            >
              JUNIOR PROGRAMS
            </a>
            <a
              onClick={() => setMenuOpen(false)}
              href="/italy-tour"
              className="whitespace-nowrap border-b border-white/20 py-4"
            >
              ITALY TOUR
            </a>
            <a
              onClick={() => setMenuOpen(false)}
              href="/team"
              className="whitespace-nowrap border-b border-white/20 py-4"
            >
              MEET OUR TEAM
            </a>
            {/* LOGIN/LOGOUT hidden for now — re-enable to bring auth back.
            <button
              type="button"
              onClick={onAuthClick}
              className="mt-8 text-left text-lg font-black uppercase tracking-wide text-white/70"
            >
              {loggedIn ? 'LOGOUT' : 'LOGIN'}
            </button>
            */}
          </div>
        </div>
      )}
    </>
  )
}
