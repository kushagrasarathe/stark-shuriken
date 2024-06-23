"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTimestamp } from "@/lib/utils";
import { getAllSimulated } from "@/utils/apiMethod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RequestData {
  requestId: string;
  timestamp: number;
  isSuccess: boolean;
}

interface AllKeysBasicData {
  allKeysBasicData: RequestData[];
}

export default function Page() {
  const [allTransactions, setAllTransactions] =
    useState<AllKeysBasicData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllSimulations() {
    try {
      const data = await getAllSimulated();
      if (data) {
        setAllTransactions(data);
      }
    } catch (error) {
      console.error("Error fetching simulations:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllSimulations();
  }, []);

  return (
    <Card className="w-full rounded-lg p-2 bg-indigo-500/5">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">Simulation List</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <Loader2 className="animate-spin size-5" />
          </div>
        ) : allTransactions?.allKeysBasicData?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead className="">Simulation ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allTransactions.allKeysBasicData.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/simulator/${item.requestId}`}>
                      {item.requestId}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {item.isSuccess ? (
                      <Badge variant={"default"} className="bg-green-500">
                        Success
                      </Badge>
                    ) : (
                      <Badge variant={"outline"} className="bg-red-500">
                        Failed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{formatTimestamp(item.timestamp)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-4">No simulations found.</div>
        )}
      </CardContent>
    </Card>
  );
}
