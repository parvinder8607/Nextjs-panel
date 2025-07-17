import {Sidebar} from "nextjs-panel";
import { registeredResources } from "@/resources";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      
          <div className="flex">
          <Sidebar resources={registeredResources} />
          {children}
          </div>
        
    );
  }