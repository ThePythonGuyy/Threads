import { Inter, Raleway } from "next/font/google";
import localFont from 'next/font/local'

export const inter = Inter({ subsets: ["latin"] });

export const raleway = Raleway({ subsets: ["latin"] });

export const jaoren = localFont({src: '../public/fonts/Jaoren.ttf'})
