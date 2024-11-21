import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Filter from "./Filter";
import { useState } from "react";

export default function FilterModal({ isOpen, onOpenChange, filter, setFilter }: Readonly<{ isOpen: boolean, onOpenChange: (open: boolean) => void, filter: any, setFilter: any }>) {

    const [filterMock, setFilterMock] = useState<any>({
        key: filter.key,
        value: filter.value,
    });

    const handleSave = () => {
        setFilter(filterMock);
        onOpenChange(false);
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                            <ModalBody>
                                <Filter filter={filterMock} setFilter={setFilterMock} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onPress={handleSave}>
                                    Aceptar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
