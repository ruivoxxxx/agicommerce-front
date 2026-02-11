import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CardProduto } from "@/modules/taskManager/components/cardProduto";
import { useState } from "react";
import { DialogCreateProduto } from "@/modules/taskManager/components/dialogCreateProduto";

function TaskManager() {
  const [openDialog, setOpenDialog] = useState(false);

  const product = {
    name: "Notebook Gamer RGB",
    price: "5499.90",
    category: "Eletrônicos",
    stock: "45",
    image: null,
  };

  return (
    <div className="w-full h-screen p-12 space-y-3">
      <header className="space-y-3">
        <div className="flex justify-between">
          <h1 className="text-bold text-2xl">Catálogo de Produtos</h1>
          <Button onClick={() => setOpenDialog(true)}>+ Novo Produto</Button>
        </div>
        <div>
          <Input className="w-96" placeholder="Buscar produtos..." />
        </div>
      </header>
      <main>
        <CardProduto
          category={product.category}
          name={product.name}
          price={product.price}
          stock={product.stock}
        />
      </main>
      {openDialog && (
        <DialogCreateProduto
          isOpen={openDialog}
          onCLose={() => setOpenDialog(false)}
        />
      )}
    </div>
  );
}

export { TaskManager };
