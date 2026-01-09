export default function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": "https://elviencode.vercel.app/#person",

        name: "Elvien Aninditha Purnawan",
        alternateName: "elviencode",
        url: "https://elviencode.vercel.app",

        jobTitle: "Full Stack Developer",

        description:
            "Elvien Aninditha Purnawan is a Full Stack Developer and the creator of elviencode, a personal portfolio website showcasing projects, skills, and experience.",

        knowsAbout: [
            "Full Stack Web Development",
            "Frontend and Backend Engineering",
            "Modern JavaScript Frameworks",
            "Web Application Architecture",
            "API Development",
            "Database Design"
        ],

        sameAs: [
            "https://github.com/lvnvoid",
            "https://www.linkedin.com/in/elvien",
            "https://www.instagram.com/elvien_se",
            "https://www.tiktok.com/@lvnv0id"
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
