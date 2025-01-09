export function formatDate(isoDate: string): string {
    const date = new Date(isoDate);
    
    const formatter = new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    });
  
    return formatter.format(date);
  }