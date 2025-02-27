import { ContactUsForm } from '@/app/(public)/contact-us/utils';
import { Icons } from '@/components/icons';
import { description, title } from '@/components/primitives';
import { siteConfig } from '@/config/site';

export default function Page() {
    return (
        <section
            className="relative z-20 mx-auto grid w-full p-8 transition-all duration-1000 md:px-0 md:py-16 lg:w-[1080px] lg:grid-cols-4">
            <div className="relative col-span-2">
                <div className="sticky top-32 pr-4 md:mr-28">
                    <h1 className={title()}>
                        Contact us
                    </h1>
                    <p className={description({ size: 'md' })}>
                        If you wish to book a demo, or enquire about our solutions,
                        fill out the form and we’ll get in touch.
                    </p>
                    <div className="my-10 text-sm">
                        <ul className="flex flex-col gap-4">
                            <li className="flex items-start gap-2">
                                <Icons.map className="mt-1 shrink-0"/>
                                <span>{siteConfig.address}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Icons.mail/>
                                <a href={`mailto:${siteConfig.email}`}>
                                    {siteConfig.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm">
                        <p className={description({ size: 'sm' })}>Follow us on:</p>
                        <ul className="flex gap-4">
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="relative col-span-2 my-8">
                <ContactUsForm/>
            </div>
        </section>
    );
}
