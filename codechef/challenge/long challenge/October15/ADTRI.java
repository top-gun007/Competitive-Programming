//10 points
import java.util.*;
import java.io.*;
class ADTRI
{
    public static void main(String[] args) throws Exception
    {
        BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
	PrintStream ps=new PrintStream(System.out);
        int a[]=new int[5000001];
        for(int i=1;i<2237;i++)
        {
            for(int j=i+1;j<2237;j+=2)
            {
                if(j%i==0 && i!=1) continue;
                int num=(i*i)+(j*j);
                for(int k=1;k*num<5000001;k++)
                {
                    a[num*k]=1;
                }
            }
        }
        int t=Integer.parseInt(br.readLine());
        while(t>0)
        {
            int N=Integer.parseInt(br.readLine());
            String result="NO";
            if(a[N]==1) result="YES";
            ps.println(result);
            t--;
        }
        ps.close();
    }
}

