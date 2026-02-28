import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { XCircle, Copy, Check, Shield, Smartphone } from 'lucide-react';
import { formatVND } from '@/lib/vietqr';
import { toast } from 'sonner';
import qilinMascot from '@/assets/qilin-excited.png';

interface PayOSCheckoutProps {
  checkoutUrl: string;
  qrCode?: string;
  amount?: number;
  orderCode?: number;
  onCancel: () => void;
}

const MobileTransferButton = ({ checkoutUrl }: { checkoutUrl: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="w-full h-12 text-base font-semibold" onClick={() => setOpen(true)}>
        <Smartphone className="w-5 h-5 mr-2" /> Chuyển khoản
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-full w-full h-[90vh] p-0 sm:max-w-[500px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <iframe src={checkoutUrl} className="w-full h-full rounded-lg border-0" title="PayOS Checkout" allow="payment" />
        </DialogContent>
      </Dialog>
    </>
  );
};

const PayOSCheckout = ({ checkoutUrl, qrCode, amount, orderCode, onCancel }: PayOSCheckoutProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Đã sao chép');
      setTimeout(() => setCopied(false), 2000);
    } catch { toast.error('Không thể sao chép'); }
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg mb-6">
      <div className="relative bg-gradient-to-r from-primary/80 to-primary px-6 py-5">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-base font-bold text-primary-foreground">Thanh toán bảo mật</h2>
              <p className="text-xs text-primary-foreground/60">Xử lý bởi PayOS</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={onCancel}>
            <XCircle className="w-4 h-4 mr-1" /> Hủy
          </Button>
        </div>
      </div>

      <div className="p-6">
        {amount && (
          <div className="text-center mb-5">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-1">Số tiền thanh toán</p>
            <p className="text-3xl font-extrabold text-primary">{formatVND(amount)}</p>
          </div>
        )}

        <div className="flex justify-center mb-5">
          <div className="relative bg-white p-5 rounded-2xl shadow-md border border-border/40">
            {qrCode ? (
              <>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(qrCode)}&margin=0`}
                  alt="QR Code thanh toán"
                  className="w-[260px] h-[260px]"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center border-2 border-white">
                    <img src={qilinMascot} alt="Qilin" className="w-11 h-11 rounded-lg object-cover" />
                  </div>
                </div>
              </>
            ) : (
              <div className="w-[260px] h-[260px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
                  <p className="text-xs">Đang tải QR...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <div className="text-xs text-center text-muted-foreground mb-2.5 space-y-1">
            <p>📱 Bấm <strong>Chuyển khoản</strong> để mở trang thanh toán</p>
            <p className="text-[11px] text-muted-foreground/70">STK, số tiền và nội dung đã điền sẵn — chỉ cần xác nhận!</p>
          </div>
          <MobileTransferButton checkoutUrl={checkoutUrl} />
        </div>

        {orderCode && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
              <span className="text-xs text-muted-foreground">Mã đơn:</span>
              <span className="text-xs font-mono font-semibold">{orderCode}</span>
              <button onClick={() => handleCopy(orderCode.toString())} className="text-primary hover:text-primary/80">
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        <div className="bg-muted/30 rounded-xl p-4 space-y-3">
          {['Chọn ngân hàng & bấm Chuyển khoản, hoặc quét mã QR', 'App ngân hàng mở — STK, số tiền, nội dung đã điền sẵn', 'Bấm Xác nhận — tim/premium cập nhật tự động'].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-primary">{i + 1}</span>
              </div>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayOSCheckout;
