import React, { useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Check, Download, ExternalLink } from 'lucide-react';
import { TableConfig } from '../../types';
import { copyToClipboard } from '../../utils';

interface QrCardProps {
  table: TableConfig;
  fullUrl: string;
  onOpenTable: (tableId: number) => void;
}

export const QrCard: React.FC<QrCardProps> = ({ table, fullUrl, onOpenTable }) => {
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    const ok = await copyToClipboard(fullUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!qrRef.current) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    // Convert SVG to canvas and download PNG
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // 512x512 high resolution QR PNG
      canvas.width = 512;
      canvas.height = 512;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 512, 512);
      }
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `qr-table-${table.id}.png`;
      downloadLink.href = pngUrl;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-200 flex flex-col justify-between print:break-inside-avoid print:border-stone-400 print:shadow-none">
      <div>
        {/* Card Header: Table info & Pill */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: table.accentColor }}
              />
              <h3 className="font-extrabold text-stone-900 text-lg">
                {table.shortName}
              </h3>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{table.zone}</p>
          </div>

          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{
              backgroundColor: table.accentLight,
              color: table.accentColor,
            }}
          >
            QR #{table.id}
          </span>
        </div>

        {/* Thumbnail Preview of Unique Table Visual */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-4 border border-stone-100 bg-stone-50">
          <img
            src={table.imageUrl}
            alt={table.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
            Уникальная иллюстрация №{table.id}
          </div>
        </div>

        {/* Real QR Code Display */}
        <div className="flex flex-col items-center justify-center p-4 bg-stone-50 rounded-2xl border border-stone-200/60 mb-4">
          <div
            ref={qrRef}
            className="p-3 bg-white rounded-xl shadow-sm border border-stone-100"
          >
            <QRCodeSVG
              value={fullUrl}
              size={160}
              level="M"
              includeMargin={false}
              bgColor="#FFFFFF"
              fgColor="#1C1917"
            />
          </div>
          <span className="text-[11px] text-stone-400 font-medium mt-2">
            Сканируйте камерой смартфона
          </span>
        </div>

        {/* Target URL */}
        <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 text-[11px] font-mono text-stone-600 break-all mb-4 select-all">
          {fullUrl}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-stone-100 print:hidden">
        <div className="grid grid-cols-2 gap-2">
          {/* Copy URL */}
          <button
            onClick={handleCopy}
            className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 active:scale-95 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            title="Скопировать ссылку"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Ссылка</span>
              </>
            )}
          </button>

          {/* Download PNG */}
          <button
            onClick={handleDownload}
            className="py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 active:scale-95 text-stone-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            title="Скачать QR в формате PNG"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Скачать PNG</span>
          </button>
        </div>

        {/* Open Table Directly */}
        <button
          onClick={() => onOpenTable(table.id)}
          className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <span>Открыть столик</span>
          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
        </button>
      </div>
    </div>
  );
};
