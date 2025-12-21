import CertificateForm from '@/components/admin/CertificateForm'

export default function NewCertificatePage() {
    return (
        <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">Add Certificate</h2>
            <CertificateForm />
        </div>
    )
}
