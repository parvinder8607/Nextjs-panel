import { Sidebar } from "nextjs-panel";
export default function Layout({ children, }) {
    return (<div className="flex">
          <Sidebar />
          {children}
          </div>);
}
