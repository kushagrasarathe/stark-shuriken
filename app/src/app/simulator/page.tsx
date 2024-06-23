"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllSimulated } from "@/utils/apiMethod";
import Link from "next/link";
import { useEffect, useState } from "react";

interface TransactionRequestIds {
  requestIds: string[];
}

export default function Page() {
  const [allTransactions, setAllTransactions] =
    useState<TransactionRequestIds | null>(null);

  async function getAllSimulations() {
    const data = await getAllSimulated();
    if (data) {
      setAllTransactions(data);
    }
  }

  useEffect(() => {
    if (!allTransactions) {
      getAllSimulations();
    }
  }, []);

  return (
    <Card className="w-full rounded-lg p-2 bg-indigo-500/5">
      <CardHeader>
        <CardTitle className="font-semibold text-lg">Simulation List</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allTransactions?.requestIds.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  <Link href={`/simulator/${23}`}>item</Link>
                </TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
