import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";
import { Casa } from "@/types/Casa";

export default function CasaCard({ casa }: Readonly<{ casa: Casa }>) {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                {casa.imagenes?.map((imagen) => (
                    <Image
                        alt="nextui logo"
                        height={40}
                        radius="sm"
                        src={imagen.img}
                        width={40}
                    />
                ))}
                <div className="flex flex-col">
                    <p className="text-md">{casa.nombre}</p>
                    <p className="text-small text-default-500">nextui.org</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>Make beautiful websites regardless of your design experience.</p>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
}