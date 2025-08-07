import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Copy, 
  Download, 
  Share2,
  Smartphone,
  Globe
} from 'lucide-react';

interface QRCodeGeneratorProps {
  surveyUrl: string;
  surveyTitle: string;
}

export default function QRCodeGenerator({ surveyUrl, surveyTitle }: QRCodeGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = React.useState<string>('');

  useEffect(() => {
    if (canvasRef.current && surveyUrl) {
      QRCode.toCanvas(canvasRef.current, surveyUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }, (error) => {
        if (error) {
          console.error('QR Code generation error:', error);
        } else {
          // Convert canvas to data URL for download
          const dataUrl = canvasRef.current?.toDataURL('image/png');
          if (dataUrl) {
            setQrDataUrl(dataUrl);
          }
        }
      });
    }
  }, [surveyUrl]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(surveyUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const downloadQRCode = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.download = `${surveyTitle.replace(/\s+/g, '-')}-qr-code.png`;
      link.href = qrDataUrl;
      link.click();
    }
  };

  const shareSurvey = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: surveyTitle,
          text: `Please take a moment to complete this survey: ${surveyTitle}`,
          url: surveyUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      copyToClipboard();
    }
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Share Your Survey</h3>
        <p className="text-muted-foreground text-sm">
          Generate a QR code or share the direct link
        </p>
      </div>

      <div className="space-y-6">
        {/* QR Code Display */}
        <div className="flex justify-center">
          <div className="bg-white p-4 rounded-lg shadow-soft">
            <canvas ref={canvasRef} />
          </div>
        </div>

        {/* Survey URL */}
        <div className="space-y-3">
          <label className="text-sm font-medium">Survey URL</label>
          <div className="flex gap-2">
            <Input 
              value={surveyUrl} 
              readOnly 
              className="flex-1"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={copyToClipboard}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={downloadQRCode}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download QR
          </Button>
          
          <Button 
            variant="outline" 
            onClick={shareSurvey}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Sharing Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Sharing Options</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Smartphone className="w-4 h-4 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Mobile</div>
                <div className="text-muted-foreground text-xs">Scan QR code</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Globe className="w-4 h-4 text-primary" />
              <div className="text-sm">
                <div className="font-medium">Web</div>
                <div className="text-muted-foreground text-xs">Share link</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <h4 className="text-sm font-medium mb-2">💡 Pro Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Print the QR code and place it in high-traffic areas</li>
            <li>• Include the QR code in email signatures</li>
            <li>• Add to business cards or flyers</li>
            <li>• Share on social media with the direct link</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
