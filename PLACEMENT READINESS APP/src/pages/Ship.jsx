import { Link } from 'react-router-dom';
import { isAllTestsPassed } from '../lib/testChecklist';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export function Ship() {
  const unlocked = isAllTestsPassed();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link
          to="/prp/07-test"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Test Checklist
        </Link>

        {unlocked ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Ready to Ship
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All 10 tests passed. The Placement Readiness Platform is ready for deployment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Lock className="w-6 h-6" />
                Ship Locked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Complete all 10 tests on the Test Checklist before shipping.
              </p>
              <Link
                to="/prp/07-test"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-colors"
              >
                Go to Test Checklist
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
