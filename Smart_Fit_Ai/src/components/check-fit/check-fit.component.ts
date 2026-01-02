import { Component, ChangeDetectionStrategy, signal, ElementRef, ViewChild, OnDestroy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanHistory } from '../../app.types';

type ScanState = 'idle' | 'requesting' | 'streaming' | 'scanning' | 'results' | 'error' | 'manual';

@Component({
  selector: 'app-check-fit',
  templateUrl: './check-fit.component.html',
  imports: [CommonModule],
})
export class CheckFitComponent implements OnDestroy {
  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;

  scanState = signal<ScanState>('idle');
  errorMessage = signal('');
  scanProgress = signal(0);
  predictions = signal<ScanHistory['predictions'] | null>(null);
  
  scanSaved = output<ScanHistory>();

  private stream: MediaStream | null = null;
  private intervalId: any = null;

  async startScan() {
    this.scanState.set('requesting');
    this.errorMessage.set('');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported by your browser.');
      }
      this.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      this.scanState.set('streaming');
      if (this.videoElement) {
        this.videoElement.nativeElement.srcObject = this.stream;
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  simulateScan() {
    this.scanState.set('scanning');
    this.scanProgress.set(0);
    this.intervalId = setInterval(() => {
      this.scanProgress.update(p => {
        const newProgress = p + 20;
        if (newProgress >= 100) {
          clearInterval(this.intervalId);
          this.generatePredictions();
          return 100;
        }
        return newProgress;
      });
    }, 500);
  }
  
  generatePredictions() {
    const bust = (34 + Math.random() * 8).toFixed(1);
    const waist = (28 + Math.random() * 6).toFixed(1);
    const hips = (36 + Math.random() * 8).toFixed(1);
    const sizes = ['S', 'M', 'L', 'XL'] as const;
    const topSize = sizes[Math.floor(Math.random() * sizes.length)];
    const bottomSize = sizes[Math.floor(Math.random() * sizes.length)];
    
    this.predictions.set({
      bust: `${bust}in`,
      waist: `${waist}in`,
      hips: `${hips}in`,
      topSize,
      bottomSize,
    });
    
    this.scanState.set('results');
    this.stopCamera();
  }

  saveResults() {
    const currentPredictions = this.predictions();
    if (currentPredictions) {
      const newScan: ScanHistory = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        predictions: currentPredictions
      };
      this.scanSaved.emit(newScan);
      this.reset();
    }
  }
  
  reset() {
    this.stopCamera();
    this.scanState.set('idle');
    this.predictions.set(null);
    this.scanProgress.set(0);
    this.errorMessage.set('');
  }

  private stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.videoElement) {
      this.videoElement.nativeElement.srcObject = null;
    }
  }

  private handleError(err: any) {
    this.scanState.set('error');
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      this.errorMessage.set('Camera access was denied. Please allow camera access in your browser settings.');
    } else {
      this.errorMessage.set('Could not access the camera. Please ensure it is not being used by another application.');
    }
    this.stopCamera();
  }
  
  switchToManual() {
    this.scanState.set('manual');
    this.stopCamera();
  }

  ngOnDestroy() {
    this.stopCamera();
    if(this.intervalId) clearInterval(this.intervalId);
  }
}
