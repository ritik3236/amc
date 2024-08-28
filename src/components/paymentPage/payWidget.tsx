import { Divider } from '@nextui-org/divider';

import { Snippet } from '@nextui-org/snippet';

import { Logo } from '@/components/icons';
import { QRCodeGenerator } from '@/components/qrCodeGenerator';

export const PayWidget = () => {
    return (
        <section className="w-full rounded-lg bg-white shadow-lg contain-content dark:bg-default-50 md:w-[380px]">
            <div className="bg-default-100 p-4">
                <div className="flex items-center justify-between">
                    <div className="-ml-1 flex items-center gap-1">
                        <Logo size={32}/>
                        <p className="font-bold">CoinDhan Pay</p>
                    </div>
                    <div>Order Id: <span className="text-sm font-semibold">#8945</span></div>
                </div>
                <div className="font-semibold">Fiat: 42724.823 USD</div>
            </div>
            <div className="p-4">
                <div className="text-center font-semibold">Network: ETH</div>
                <QRCodeGenerator value="0x502aECFE253E6AA0e8D2A06E12438FFeD0Fe16a0"/>
                <div className="mb-4">
                    <div className="mb-1 text-sm font-semibold">Amount:</div>
                    <Snippet
                        hideSymbol
                        className="w-full"
                        classNames={{ pre: 'break-all whitespace-normal' }}
                        radius="sm"
                    >
                        42790724.823 BCH
                    </Snippet>
                </div>
                <div className="mb-4">
                    <div className="mb-1 text-sm font-semibold">Address:</div>
                    <Snippet
                        hideSymbol
                        className="w-full"
                        classNames={{ pre: 'break-all whitespace-normal' }}
                        radius="sm"
                    >
                        0x502aECFE253E6AA0e8D2A06E12438FFeD0Fe16a0
                    </Snippet>
                </div>
                <Divider/>
                <div className="flex items-center justify-center gap-1 pt-4 text-sm">
                    <span>Time Remaining:</span><span className="text-danger-500">00:01:36s</span>
                </div>
            </div>
        </section>
    );
};