import type { CardProdutoProp } from "@/modules/taskManager/components/cardProduto";
import { api } from "@/modules/taskManager/services/api";
import { Badge } from "@/shared/components/ui/badge";
import { CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<CardProdutoProp | null>(null);
  const navigate = useNavigate();

  async function getProduct() {
    try {
      const response = await api.get(`api/produtos/${id}`);
      if (response) {
        setProduct(response.data);
        return;
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="w-full h-screen">
      <div
        className="h-80 w-full"
        style={{
          background:
            "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a78bfa 100%)",
        }}
      />

      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-gray-800 text-base">
          {product?.nome}
        </h3>

        <p className="text-xl font-bold text-green-500">{product?.preco}</p>

        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-normal rounded-full px-3"
          >
            {product?.categoria}
          </Badge>
          <Badge
            variant="outline"
            className="border-green-500 text-green-600 bg-green-50 hover:bg-green-50 font-normal rounded-full px-3 flex items-center gap-1"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            {product?.estoque} unidades
          </Badge>
        </div>
      </div>
    </div>
  );
}

export { ProductDetail };
