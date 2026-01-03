import { registeredResources } from "@/resources";
export default function AdminPage({ params }: {
    params: {
        resource: keyof typeof registeredResources;
    };
}): Promise<import("react/jsx-runtime").JSX.Element>;
