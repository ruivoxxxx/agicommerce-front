import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  CardProduto,
  type CardProdutoProp,
} from "@/modules/taskManager/components/cardProduto";
import { useEffect, useState } from "react";
import { DialogCreateProduto } from "@/modules/taskManager/components/dialogCreateProduto";
import { DialogEditProduto } from "../components/dialogEditProduto";
import { Field } from "@/shared/components/ui/field";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Plus, Search, X } from "lucide-react";
import { api } from "../service/api";

function TaskManager() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [productSelected, setProductSelected] =
    useState<CardProdutoProp | null>(null);
  const [search, setSearch] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const [orderSelected, setOrderSelected] = useState("recentes");
  const [products, setProducts] = useState<CardProdutoProp[]>([]);

  async function getProducts() {
    try {
      const response = await api.get<CardProdutoProp[]>("api/produtos", {
        params: {
          categoria: categorySelected === "all" ? "" : categorySelected,
          ordenar: orderSelected,
          nome: search,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteProduct(id: string) {
    try {
      const response = await api.delete(`api/produtos/${id}`);
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id),
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [categorySelected, orderSelected, search]);

  return (
    <div className="w-full h-screen p-4 lg:p-12 space-y-3">
      <header>
        <div className="flex flex-col md:flex-row gap-3 md:justify-between md:gap-0 items-center px-4 md:px-0">
          <h1 className="font-bold text-2xl text-text-primary">
            Catálogo de Produtos
          </h1>

          <Button onClick={() => setOpenDialog(true)} className="w-full">
            <Plus />
            Novo Produto
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="relative w-full md:flex-1">
            <Input
              className="w-full pr-10"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute top-1/2 -translate-y-1/2 right-3 h-4 w-4 text-gray-500" />
          </div>

          <Field className="w-full md:w-60">
            <Label>Filtre por Categoria</Label>
            <Select
              value={categorySelected}
              onValueChange={(e) => setCategorySelected(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="computador">Computador</SelectItem>
                <SelectItem value="console">Consoles</SelectItem>
                <SelectItem value="monitor">Monitores</SelectItem>
                <SelectItem value="celular">Celulares</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field className="w-full md:w-52">
            <Label>Ordenação</Label>
            <Select
              value={orderSelected}
              onValueChange={(e) => setOrderSelected(e)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recentes">Recentes</SelectItem>
                <SelectItem value="antigos">Antigos</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
          "
        >
          {products.map((product) => (
            <CardProduto
              key={product.id}
              {...product}
              handleExcluir={deleteProduct}
              openEdit={() => setOpenEditDialog(true)}
              selectProduct={() => setProductSelected(product)}
            />
          ))}

          {products.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <X className="w-16 h-16 text-red-700 mb-2" />
              <span className="text-gray-600">
                Nenhum produto encontrado...
              </span>
            </div>
          )}
        </div>
      </main>
      {openDialog && (
        <DialogCreateProduto
          isOpen={openDialog}
          onCLose={() => setOpenDialog(false)}
          getProduct={getProducts}
        />
      )}
      {openEditDialog && (
        <DialogEditProduto
          isOpen={openEditDialog}
          onCLose={() => setOpenEditDialog(false)}
          getProduct={getProducts}
          selectedProduct={productSelected}
        />
      )}
    </div>
  );
}

export { TaskManager };
