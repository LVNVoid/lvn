export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Elvien",
        url: "https://elviencode.vercel.app",
        jobTitle: "Full Stack Developer",
        sameAs: [
            "https://github.com/lvnvoid",
            "https://linkedin.com/in/elvien",
            // Add other social links here
        ],
        knowsAbout: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
        description: "Personal portfolio of Elvien, a Full Stack Developer specializing in building modern web applications."
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
