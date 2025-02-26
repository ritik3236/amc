import { title } from '@/components/primitives';

export default function Page() {
    return (
        <section className="relative z-20 mx-auto grid w-full p-4 md:px-0 md:py-16 lg:w-[1080px] lg:grid-cols-4">
            <div className="relative col-span-4 flex h-screen flex-col gap-4">
                <h1 className={title({ size: 'xs', className: 'uppercase' })}>
                    Terms & Conditions
                </h1>
                <p className="font-semibold">Last updated: 01-Jan-2025</p>
                {/*<object*/}
                {/*    className="flex flex-1"*/}
                {/*    data="https://01-public-assets.s3.ap-south-1.amazonaws.com/PrivacyPolicy.pdf"*/}
                {/*    type="application/pdf"*/}
                {/*/>*/}
                <p>Updating soon...</p>
            </div>
        </section>
    );
}
