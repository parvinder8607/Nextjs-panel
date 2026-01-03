import Link from "next/link";
import { Resource } from "../lib/Resource"; // adjust path as needed
import styles from "./Sidebar.module.css";

type SidebarProps = {
  resources: Record<string, Resource>;
};

export default function Sidebar({ resources }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.heading}>Admin Panel</h2>
      <ul className={styles.list}>
        {Object.entries(resources).map(([key, resource]) => (
          <li key={key}>
            <Link href={`/admin/${resource.name}`} className={styles.link}>
              {resource.icon && resource.icon} {resource.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
