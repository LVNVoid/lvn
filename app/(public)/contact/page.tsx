import ContactClient from "./contact-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Me",
    description: "Get in touch with Elvien for collaboration, opportunities, or just to say hi.",
};

export default function ContactPage() {
    return <ContactClient />;
}
