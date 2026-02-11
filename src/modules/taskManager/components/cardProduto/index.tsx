import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Pencil, CheckSquare, Trash2 } from "lucide-react";

export type CardProdutoProp = {
  name: string;
  price: string;
  category: string;
  stock: string;
  image?: null;
};

export function CardProduto({
  category,
  image,
  name,
  price,
  stock,
}: CardProdutoProp) {
  return (
    <Card className="w-full max-w-72 overflow-hidden rounded-2xl shadow-lg border-0">
      <div
        className="h-40 w-full -mt-6"
        style={{
          background: image
            ? `url(${image}) center/cover`
            : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
        }}
      />
      <CardContent className="-my-6 p-4 space-y-3">
        <h3 className="font-semibold text-gray-800 text-base">{name}</h3>

        <p className="text-xl font-bold text-green-500">{price}</p>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-normal rounded-full px-3"
          >
            {category}
          </Badge>
          <Badge
            variant="outline"
            className="border-green-500 text-green-600 bg-green-50 hover:bg-green-50 font-normal rounded-full px-3 flex items-center gap-1"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            {stock} unidades
          </Badge>
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            onClick={() => console.log("editar")}
            className="flex-1 text-white rounded-lg h-9 text-sm font-medium"
          >
            <Pencil className="w-4 h-4 mr-1.5" />
            Editar
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => console.log("deletar")}
            className="flex-1 text-white rounded-lg h-9 text-sm font-medium"
          >
            <Trash2 className="w-4 h-4 mr-1.5" />
            Excluir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
