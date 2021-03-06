#include <iostream>
#include <stack>
#include <stdlib.h>
#include <stdio.h>
#include <math.h>
using namespace std;
struct Point
{
    long long int x, y;
};

// A globle point needed for  sorting points with reference
// to  the first point Used in compare function of qsort()
Point p0;

// A utility function to find next to top in a stack
Point nextToTop(stack<Point> &S)
{
    //cerr<<"inside nexttoTop"<<endl;
    //cerr<<"S.top()= "<<S.top().y<<endl;
    Point p = S.top();
    S.pop();
    //cout<<"stack empty= "<<!S.empty()<<endl;
  //  cerr<<"popped\n";
    //cerr<<"S.top()2 = "<<S.top().y<<endl;
    Point res = S.top();
    S.push(p);
    return res;
}

// A utility function to swap two points
int swap(Point &p1, Point &p2)
{
   // cerr<<"swap\n"<<endl;
    Point temp = p1;
    p1 = p2;
    p2 = temp;
}

// A utility function to return square of distance
// between p1 and p2
int distSq(Point p1, Point p2)
{
  //  cerr<<"distsq"<<endl;
    return (p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y);
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are colinear
// 1 --> Clockwise
// 2 --> Counterclockwise
int orientation(Point p, Point q, Point r)
{
    //cerr<<"orientation"<<endl;
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0;  // colinear
    return (val > 0)? 1: 2; // clock or counterclock wise
}

// A function used by library function qsort() to sort an array of
// points with respect to the first point
int compare(const void *vp1, const void *vp2)
{
   // cerr<<"inside compare"<<endl;
   Point *p1 = (Point *)vp1;
   Point *p2 = (Point *)vp2;

   // Find orientation
   int o = orientation(p0, *p1, *p2);
   if (o == 0)
     return (distSq(p0, *p2) >= distSq(p0, *p1))? -1 : 1;

   return (o == 2)? -1: 1;
}

// Prints convex hull of a set of n points.
double convexHull(Point points[], int n)
{
//    cerr<<"inside convexhull"<<endl;
   // Find the bottommost point
   int ymin = points[0].y, min = 0;
   for (int i = 1; i < n; i++)
   {
     int y = points[i].y;

     // Pick the bottom-most or chose the left
     // most point in case of tie
     if ((y < ymin) || (ymin == y && points[i].x < points[min].x))
       { ymin = points[i].y; min = i; }
   }

   // Place the bottom-most point at first position
   swap(points[0], points[min]);
   //cerr<<"passed swap\n"<<endl;
   // Sort n-1 points with respect to the first point.
   // A point p1 comes before p2 in sorted ouput if p2
   // has larger polar angle (in counterclockwise
   // direction) than p1
   p0 = points[0];
   qsort(&points[1], n-1, sizeof(Point), compare);
 //  cerr<<"passed qsort\n"<<endl;
   // If two or more points make same angle with p0,
   // Remove all but the one that is farthest from p0
   // Remember that, in above sorting, our criteria was
   // to keep the farthest point at the end when more than
   // one points have same angle.
   int m = 1; // Initialize size of modified array
   for (int i=1; i<n; i++)
   {
       // Keep removing i while angle of i and i+1 is same
       // with respect to p0
       while (i < n-1 && orientation(p0, points[i],points[i+1]) == 0)
          i++;


       points[m] = points[i];
       m++;  // Update size of modified array
   }
//   cerr<<"after this"<<endl;
   // If modified array of points has less than 3 points,
   // convex hull is not possible
   if (m < 3) return 0;

   // Create an empty stack and push first three points
   // to it.
   stack<Point> S;
   S.push(points[0]);
   S.push(points[1]);
   S.push(points[2]);

   // Process remaining n-3 points
   for (int i = 3; i < m; i++)
   {
      // Keep removing top while the angle formed by
      // points next-to-top, top, and points[i] makes
      // a non-left turn
      while (S.size()>1 && orientation(nextToTop(S), S.top(), points[i]) != 2)
      {
         Point pp=S.top();
         S.pop();
         cout<<"pop {"<<pp.x<<","<<pp.y<<"} "; 
      }
      S.push(points[i]);
      Point pc=points[i];
      cout<<"push {"<<pc.x<<","<<pc.y<<"} ";
   }
//    cerr<<"before this"<<endl;
    int index=0;
    double area=0;
    long long int prex,prey,nowx,nowy,firstx,firsty;   
    if(S.size()<3) area=0;
    else
    {   
        while (!S.empty())
        {
            Point p = S.top();
            if(index==0)
            { 
                prex=p.x; prey=p.y; index++;
                firstx=p.x; firsty=p.y;
            }
            else
            {
                nowx=p.x; nowy=p.y;
                area+=(prex*nowy-nowx*prey);
                prex=nowx; prey=nowy;
            }
            //cout << "(" << p.x << ", " << p.y <<")" << endl;
            S.pop();
        }
        area+=(nowx*firsty-firstx*nowy);
        area=fabs(area)/2;
    }   
   // Now stack has the output points, print contents of stack
   
   return area;

}

// Driver program to test above functions
int main()
{
    int t; scanf("%d",&t);
    Point points[100002];
    while(t>0)
    {
        int index=0;
        int n; scanf("%d",&n);
        double area=0;
        for(int i=0;i<n;i++)
        {
            char c; long long int x,y;
            cin>>c;
            scanf("%lld%lld",&x,&y);
            long long int num=0;
      //      cout<<"char c= "<<c<<endl;
            if(c=='+')
            {
                points[index].x=x;
                points[index++].y=y;
                num=index;
        //        cout<<"num="<<num<<endl;
   //             for(int i=0;i<index;i++)
     //           {
       //             cout<<"{"<<points[i].x<<", "<<points[i].y<<"} ";
         //       }
           //     cout<<endl;
                if(num<3) area=0; 
                else area=convexHull(points,num);
            }
            else
            {
                int flag=0;
                //cout<<"in the else\n";
                for(int i=0;i<index;i++)
                {
                    if(x==points[i].x && y==points[i].y)
                    {
                        swap(points[i],points[index-1]);
                        flag=1;
                    }
                    if(flag==1) break;
                }
                //points[index-1].x=0; points[index-1].y=0;
      //          for(int i=0;i<index;i++)
    //            {
  //                  cout<<"{"<<points[i].x<<", "<<points[i].y<<"} ";
//                }
                index--;
                num=index;
                if(num<3) area=0; 
                else area=convexHull(points,num);
            }
            printf("%.1lf\n",area);
        }
        t--;
    }
    return 0;
}